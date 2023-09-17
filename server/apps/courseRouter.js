import { Router } from "express";
import { supabase } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";
import "dotenv/config";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  const title = req.query.title;
  let results;

  if (title) {
    results = await supabase
      .from("courses")
      .select("*")
      .ilike("course_name", `%${title}%`)
      .eq("public_status", 1)
      .limit(limit == null ? 12 : limit);
  } else {
    results = await supabase
      .from("courses")
      .select("*")
      .eq("public_status", 1)
      .limit(limit == null ? 12 : limit);
  }
  const course_idArray = results.data.map((value) => value.course_id);
  const lessonCount = await supabase
    .from("lessons")
    .select("course_id")
    .in("course_id", course_idArray);
  const lessonCountArrayFilter = course_idArray.map((value) => {
    return {
      course_id: value,
      lesson_count: lessonCount.data.filter(
        (subValue) => subValue.course_id === value
      ).length,
    };
  });
  const newMap = results.data.map((value) => {
    return {
      ...value,
      lesson_count: lessonCountArrayFilter.filter((subValue) => {
        return subValue.course_id === value.course_id;
      })[0].lesson_count,
    };
  });
  if (results.statusText === "OK") {
    return res.json({
      data: newMap,
    });
  } else {
    return res.status(400).send(`API ERROR: ${results.error.message}`);
  }
});

courseRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const results = await supabase
    .from("courses")
    .select("*")
    .eq("course_id", id);
  if (results.statusText === "OK") {
    return res.json({
      data: results.data,
    });
  } else {
    return res.status(400).send(`API ERROR: ${results.error.message}`);
  }
});

//courseDetailPage/BE sprint2Edited
courseRouter.get("/lessons/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("course_id")
      .eq("course_id", courseId)
      .single();

    if (courseError) {
      return res.status(500).json({ error: courseError.message });
    }

    if (!courseData) {
      return res.status(404).json({ error: "Course Id not found" });
    }

    const { data, error } = await supabase
      .from("lessons")
      .select("lesson_name, sub_lessons(*)")
      .eq("course_id", courseId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lessonData = data;

    return res.json({
      data: lessonData,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

courseRouter.get("/mycourses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const isValidUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(userId);

    if (!isValidUUID) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const { data: userCourseData, error: userCourseError } = await supabase
      .from("user_course_details")
      .select(
        `course_id:courses( course_id, course_name, course_summary, course_duration, course_cover_img ), subscription_id:subscriptions( subscription_status ), status_id:status( status_value )`
      )
      .eq("user_id", userId)
      .eq("subscription_id", 1);

    if (userCourseError) {
      return res.status(500).json({ error: userCourseError.message });
    }

    if (userCourseData.length === 0) {
      return res.status(404).json({ error: "No courses found for this user" });
    }

    for (const course of userCourseData) {
      const courseId = course.course_id.course_id;
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("lesson_name")
        .eq("course_id", courseId);

      if (lessonError) {
        return res.status(500).json({ error: lessonError.message });
      }

      const lessonCount = lessonData.length;

      course.lesson_count = lessonCount;
    }

    const myCourseData = userCourseData.map((value) => {
      return {
        course_id: value.course_id.course_id,
        course_name: value.course_id.course_name,
        course_summary: value.course_id.course_summary,
        course_cover_img: value.course_id.course_cover_img,
        course_duration: value.course_id.course_duration,
        subscription_status: value.subscription_id.subscription_status,
        status_value: value.status_id.status_value,
        lesson_count: value.lesson_count,
      };
    });

    return res.json({
      data: myCourseData,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// subscipt_course
courseRouter.post("mycourses/:courseId", async (req, res) => {
  try {
    const { user_id, course_id } = req.body;
    const findUserSubscribeCourse = await supabase
      .from("user_course_details")
      .select("*")
      .eq("user_id", user_id)
      .eq("course_id", course_id);
    if (findUserSubscribeCourse.data.length > 0) {
      res.status(403).send("User already subscribed this course");
    } else {
      const subscribeCourse = await supabase
        .from("user_course_details")
        .insert([
          {
            course_id: req.body.course_id,
            user_id: req.body.user_id,
            status_id: 1,
            subscription_id: 1,
          },
        ]);

      const userCourseDetailId = await supabase
        .from("user_course_details")
        .select("user_course_detail_id")
        .eq("course_id", req.body.course_id)
        .eq("user_id", req.body.user_id);

      // // All lessons
      const lesson = await supabase
        .from("lessons")
        .select("lesson_id")
        .eq("course_id", req.body.course_id);
      const lessonArray = lesson.data.map((value) => {
        return value.lesson_id;
      });
      const subLessonArray = await supabase
        .from("sub_lessons")
        .select("*")
        .in("lesson_id", lessonArray);

      const insertSubUserDeatil = subLessonArray.data.map((value) => ({
        user_course_detail_id: userCourseDetailId.data[0].user_course_detail_id,
        sub_lesson_id: value.sub_lesson_id,
        status_id: 1,
      }));
      const lessonsData = lesson.data.map((lesson) => ({
        user_course_detail_id: userCourseDetailId.data[0].user_course_detail_id,
        lesson_id: lesson.lesson_id,
        status_id: 1,
      }));
      const subscribeLessons = await supabase
        .from("user_lesson_details")
        .insert(lessonsData);
      const subscribeSubLessons = await supabase
        .from("user_sub_lesson_details")
        .insert(insertSubUserDeatil);
      if (
        subscribeCourse.statusText &&
        subscribeLessons.statusText &&
        subscribeSubLessons.statusText === "Created"
      ) {
        return res.json({ message: "Subscription course successfully" });
      } else {
        return res.status(400).send("API ERROR");
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//check subscriptions status
courseRouter.get("/subscription/:userId/:courseId", async (req, res) => {
  const { userId, courseId } = req.params;
  const isSubscribed = await supabase
    .from("user_course_details")
    .select("course_id,user_id")
    .eq("course_id", courseId)
    .eq("user_id", userId);
  return res.json({ isSubscribed });
});

courseRouter.get("/coursedetail/learning", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const course_id = req.query.course_id;
    const userCourseDetails = await supabase
      .from("user_course_details")
      .select("*")
      .match({ user_id: user_id, course_id: course_id });
    if (userCourseDetails.data[0].length === 0) {
      return res.json({
        message: "Not found.",
      });
    } else {
      const userLessonDetail = await supabase
        .from("user_lesson_details")
        .select("*")
        .eq(
          "user_course_detail_id",
          userCourseDetails.data[0].user_course_detail_id
        );
      const courseDetailOnThisCourse = await supabase
        .from("courses")
        .select("course_name,course_summary")
        .eq("course_id", course_id);
      const mapForFetchLessonName = userLessonDetail.data.map((value) => {
        return value.lesson_id;
      });
      const lessonDetailOnThisCourse = await supabase
        .from("lessons")
        .select("*")
        .in("lesson_id", mapForFetchLessonName);
      const userSubLessonDetail = await supabase
        .from("user_sub_lesson_details")
        .select("*")
        .eq(
          "user_course_detail_id",
          userCourseDetails.data[0].user_course_detail_id
        );
      const subLessonDetailOnThisCourse = await supabase
        .from("sub_lessons")
        .select("*")
        .in("lesson_id", mapForFetchLessonName);
      const subLessonMap = subLessonDetailOnThisCourse.data.map((mainValue) => {
        const status = userSubLessonDetail.data.filter(
          (subValue) => mainValue.sub_lesson_id === subValue.sub_lesson_id
        )[0].status_id;
        return {
          sub_lesson_id: mainValue.sub_lesson_id,
          sub_lesson_name: mainValue.sub_lesson_name,
          sub_lesson_video: mainValue.sub_lesson_video,
          lesson_id: mainValue.lesson_id,
          status_value:
            status === 1
              ? "not_started"
              : status === 2
              ? "in_progress"
              : "completed",
        };
      });
      const lessonMap = lessonDetailOnThisCourse.data.map((value) => {
        const status = userLessonDetail.data.filter(
          (subValue) => subValue.lesson_id === value.lesson_id
        )[0].status_id;
        return {
          lesson_name: `${value.lesson_name}`,
          status_value:
            status === 1
              ? "not_started"
              : status === 2
              ? "in_progress"
              : "completed",
          sub_lesson: subLessonMap.filter(
            (subValue) => subValue.lesson_id === value.lesson_id
          ),
        };
      });
      return res.json({
        data: [
          {
            user_course_detail_id:
              userCourseDetails.data[0].user_course_detail_id,
            course_detail: {
              course_id: courseDetailOnThisCourse.data[0].course_id,
              course_name: courseDetailOnThisCourse.data[0].course_name,
              course_summary: courseDetailOnThisCourse.data[0].course_summary,
              status_value:
                userCourseDetails.data[0].status_id === 1
                  ? "not_started"
                  : userCourseDetails.data[0].status_id === 2
                  ? "in_progress"
                  : "completed",
            },
            lesson_detail: lessonMap,
          },
        ],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid API",
    });
  }
});

courseRouter.put("/update/sub_lesson", async (req, res) => {
  try {
    const user_course_detail_id = req.body.user_course_detail_id;
    const sub_lesson_id = req.body.sub_lesson_id;
    const status_value =
      req.body.status_value === "in_progress"
        ? 2
        : req.body.status_value === "not_started"
        ? 1
        : 3;
    const checkCompleted = await supabase
      .from("user_sub_lesson_details")
      .select("status_id")
      .match({
        user_course_detail_id: user_course_detail_id,
        sub_lesson_id: sub_lesson_id,
      });
    if (checkCompleted.data[0].status_id === 1 || status_value === 3) {
      const { data, error } = await supabase
        .from("user_sub_lesson_details")
        .update({ status_id: status_value })
        .match({
          sub_lesson_id: sub_lesson_id,
          user_course_detail_id: user_course_detail_id,
        })
        .select();
      const lessonID = await supabase
        .from("sub_lessons")
        .select("lesson_id")
        .eq("sub_lesson_id", sub_lesson_id);
      const subLessonIdArray = await supabase
        .from("sub_lessons")
        .select("sub_lesson_id")
        .eq("lesson_id", lessonID.data[0].lesson_id);
      const pureArrayForFetch = subLessonIdArray.data.map((value) => {
        return value.sub_lesson_id;
      });
      const lessonChecker = await supabase
        .from("user_sub_lesson_details")
        .select("status_id, user_course_detail_id")
        .in("sub_lesson_id", pureArrayForFetch);
      const lessonCheckerFilter = lessonChecker.data.filter((value) => {
        return value.user_course_detail_id === user_course_detail_id;
      });

      if (
        lessonCheckerFilter.length ===
        lessonCheckerFilter.filter((value) => value.status_id === 3).length
      ) {
        await supabase
          .from("user_lesson_details")
          .update({ status_id: 3 })
          .match({
            user_course_detail_id: user_course_detail_id,
            lesson_id: lessonID.data[0].lesson_id,
          });
      } else {
        const checkLesson = await supabase
          .from("user_lesson_details")
          .select("status_id")
          .match({
            user_course_detail_id: user_course_detail_id,
            lesson_id: lessonID.data[0].lesson_id,
          });
        if (checkLesson.data[0].status_id === 1) {
          await supabase
            .from("user_lesson_details")
            .update({ status_id: 2 })
            .match({
              user_course_detail_id: user_course_detail_id,
            });
        }
      }
      const lessonStatusArray = await supabase
        .from("user_lesson_details")
        .select("status_id")
        .eq("user_course_detail_id", user_course_detail_id);
      if (
        lessonStatusArray.data.length ===
        lessonStatusArray.data.filter((value) => {
          return value.status_id === 3;
        }).length
      ) {
        await supabase
          .from("user_course_details")
          .update({ status_id: 3 })
          .match({
            user_course_detail_id: user_course_detail_id,
          });
      } else {
        const checkCourse = await supabase
          .from("user_course_details")
          .select("status_id")
          .match({
            user_course_detail_id: user_course_detail_id,
          });
        if (checkCourse.data[0].status_id === 1) {
          await supabase
            .from("user_course_details")
            .update({ status_id: 2 })
            .match({
              user_course_detail_id: user_course_detail_id,
            });
        }
      }
      if (error) {
        return res.status(404).json({
          message: "API INVALID",
        });
      } else {
        return res.json({
          message: `sub lesson ID:${sub_lesson_id} on ${user_course_detail_id} updated successfully`,
        });
      }
    } else {
      return res.json({
        message:
          checkCompleted === 3
            ? "On this sub lesson already completed."
            : "On this sub lesson already in progress.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
});

export default courseRouter;
