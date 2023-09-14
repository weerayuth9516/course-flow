import { Router } from "express";
import { supabase } from "../utils/db.js";
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
      .limit(limit == null ? 12 : limit);
  } else {
    results = await supabase
      .from("courses")
      .select("*")
      .limit(limit == null ? 12 : limit);
  }
  if (results.statusText === "OK") {
    return res.json({
      data: results.data,
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
courseRouter.get("/:id/lessons/", async (req, res) => {
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

//myCoursePage_Sprint2 "added lessonCount all course, in_progress, completed"
// courseRouter.get("/:userId/mycourses", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Validate the userId format (assuming it should be a valid UUID)
//     const isValidUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(userId);

//     if (!isValidUUID) {
//       return res.status(400).json({ error: "Invalid userId format" });
//     }

//     // Query the user_course_details table to fetch courses in progress for the user
//     const { data: userCourseData, error: userCourseError } = await supabase
//       .from("user_course_details")
//       .select(
//         `course_id:courses( course_id, course_name, course_summary, course_duration ), subscription_id:subscriptions( subscription_status ), status_id:status( status_value )`
//       )
//       .eq("user_id", userId)
//       .eq("subscription_id", 1);

//     if (userCourseError) {
//       return res.status(500).json({ error: userCourseError.message });
//     }

//     if (userCourseData.length === 0) {
//       // Handle the case where there are no user courses
//       return res.status(404).json({ error: "No courses found for this user" });
//     }

//     // Iterate over userCourseData and add lesson_count to each item
//     for (const course of userCourseData) {
//       const courseId = course.course_id.course_id;
//       const { data: lessonData, error: lessonError } = await supabase
//         .from("lessons")
//         .select("lesson_name")
//         .eq("course_id", courseId);

//       if (lessonError) {
//         return res.status(500).json({ error: lessonError.message });
//       }

//       const lessonCount = lessonData.length;

//       course.lesson_count = lessonCount;
//     }

//     return res.json({
//       data: userCourseData,
//     });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

courseRouter.get("/:userId/mycourses", async (req, res) => {
  try {
    const userId = req.params.userId;

    const isValidUUID = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(userId);

    if (!isValidUUID) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const { data: userCourseData, error: userCourseError } = await supabase
      .from("user_course_details")
      .select(
        `course_id:courses( course_id, course_name, course_summary, course_duration ), subscription_id:subscriptions( subscription_status ), status_id:status( status_value )`
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
        course_name: value.course_id.course_name,
        course_summary: value.course_id.course_summary,
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

export default courseRouter;
