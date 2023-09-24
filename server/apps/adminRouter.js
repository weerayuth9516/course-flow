import { Router, query } from "express";
import { supabase } from "../utils/db.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/protect.js";
// import { upload } from "../middlewares/multerConfig.js";
import multer from "multer";

const adminRouter = Router();
// adminRouter.use(protect);

adminRouter.get("/", async (req, res) => {
  try {
    let startAt = 0;
    let endAt = 7;
    if (req.query.page && req.query.page !== 0) {
      endAt = req.query.page * 8;
      endAt += Number(req.query.page - 1);
      startAt = endAt - 8;
    }
    const courses = await supabase
      .from("courses")
      .select(
        "course_id, course_name, course_price, course_created_at, course_updated_at, course_duration, course_cover_img, public_status"
      )
      .order("public_status", {
        ascending: req.query.publicStatus === "true" ? false : true,
      })
      .order("course_price", {
        ascending: req.query.price === "true" ? false : true,
      })
      .order("course_created_at", {
        ascending: req.query.createdat === "true" ? false : true,
      })
      .order("course_updated_at", {
        ascending: req.query.updatedat === "true" ? false : true,
      })
      .range(startAt, endAt);
    if (courses.data.length !== 0 || courses.statusText === "OK") {
      const courseIdMaping = courses.data.map((vale) => {
        return vale.course_id;
      });
      const lesson = await supabase
        .from("lessons")
        .select("course_id, lesson_name")
        .in("course_id", courseIdMaping);
      console.log(lesson);
      const newMap = courses.data.map((value) => {
        return {
          ...value,
          lesson_amount: lesson.data.filter((subValue) => {
            return subValue.course_id === value.course_id;
          }).length,
        };
      });
      return res.json({ data: newMap });
    } else {
      return res.status(400).json({
        message:
          courses.data.length === 0
            ? "not found"
            : courses.data.error
              ? `${courses.data.error}`
              : "API INVALID",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "supabase invalid",
    });
  }
});

adminRouter.get("/courses/:courseId", async (req, res) => {
  try {
    if (req.params.courseId) {
      const courseResults = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", req.params.courseId);
      const lessonResult = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", req.params.courseId)
        .order("priority", { ascending: true });
      if (
        courseResults.statusText === "OK" &&
        lessonResult.statusText === "OK"
      ) {
        return res.json({
          data: {
            course: courseResults.data,
            lessons: lessonResult.data,
          },
        });
      }
    } else {
      return res.status(404).json({
        error: "course_id not found",
      });
    }
  } catch {
    return res.status(500).json({
      error: "supabase invalid",
    });
  }
});

adminRouter.post("/course/created", async (req, res) => {
  const courseDetails = {
    course_name: req.body.course_name,
    course_price: req.body.course_price,
    course_summary: req.body.course_summary,
    course_detail: req.body.course_detail,
    course_duration: req.body.course_duration,
    course_video_trailer: req.body.course_video_trailer,
    course_created_at: new Date.now(),
    course_updated_at: new Date.now(),
  };
  try {
    if (
      !courseDetails.course_name ||
      !courseDetails.course_price ||
      !courseDetails.course_summary ||
      !courseDetails.course_duration ||
      !courseDetails.course_video_trailer
    ) {
      return res.status(404).json({
        error: "Incompleted Infomation",
      });
    } else {
      const insertResult = await supabase.from("courses").upsert(courseDetails);
      if (insertResult.statusText === "Created") {
        return res.json({
          message: "Insert Infomation successfully",
        });
      } else {
        return res.status(400).json({
          message: insertResult.error,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});
adminRouter.put("/updated/:courseId", async (req, res) => {
  const courseDetails = {
    course_name: req.body.course_name,
    course_price: req.body.course_price,
    course_summary: req.body.course_summary,
    course_detail: req.body.course_detail,
    course_duration: req.body.course_duration,
    course_video_trailer: req.body.course_video_trailer,
    course_updated_at: new Date.now(),
  };
  try {
    const supabaseUpdatedResult = await supabase
      .from("courses")
      .update(courseDetails)
      .eq("course_id", req.body.course_id);
    if (supabaseUpdatedResult.status === 200) {
      return res.json({
        message: `${req.body.course_id} has been updated at ${courseDetails.course_updated_at}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

//get all lessons and sub-lesson details
adminRouter.get("/lessons/:lessonId", async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const lessonName = await supabase
      .from("lessons")
      .select("lesson_name")
      .eq("lesson_id", lessonId);

    const sublessonResult = await supabase
      .from("sub_lessons")
      .select("*")
      .eq("lesson_id ", lessonId)
      .order("priority", { ascending: true });

    if (lessonName.data.length === 0) {
      return res.status(404).json({ error: "Lesson not exist" });
    } else if (sublessonResult.data.length === 0) {
      return (
        res.json({
          data: lessonName.data[0].lesson_name,
        }),
        res.json({ message: "Sub lesson not exsit" })
      );
    } else {
      return res.json({
        data: {
          lesson_name: lessonName.data[0].lesson_name,
          sub_lessons: sublessonResult.data,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// add lesson ans sublesson * not finish*
adminRouter.post("/:courseId/lesson/created", async (req, res) => {});

// adminRouter.post("/:courseId/lesson/created", async (req, res) => {
//   const courseId = req.params.courseId;
//   const lessonName = {
//     lesson_name: req.body.lesson_name,
//   };
//   const allSublessons = req.body.sub_lessons;

//   try {
//     const courseIdUpdatedAt = await supabase
//       .from("courses")
//       .update({ course_created_at: new Date() })
//       .eq("course_id", courseId)
//       .select("course_created_at");

//     // console.log(courseIdUpdatedAt);

//     const findAllLesson = await supabase
//       .from("lessons")
//       .select("*")
//       .eq("course_id", courseId);
//     console.log(findAllLesson.data.length);
//     const lessonCreated = await supabase.from("lessons").upsert([
//       {
//         ...lessonName,
//         course_id: courseId,
//         priority: findAllLesson.data.length + 1,
//       },
//     ]);

//     // console.log(lessonCreated);

//     const findLessonId = await supabase
//       .from("lessons")
//       .select("lesson_id")
//       .eq("lesson_name", req.body.lesson_name)
//       .eq("course_id", courseId);

//     // console.log(findLessonId.data[0].lesson_id);

//     const findAllSublesson = await supabase
//       .from("sub_lessons")
//       .select("*")
//       .eq("lesson_id", findLessonId.data[0].lesson_id);

//     // console.log(findAllSublesson);

//     const lessonMap = allSublessons.map((value, findAllSublesson) => {
//       return {
//         sub_lesson_name: value.sub_lesson_name,
//         sub_lesson_video: value.sub_lesson_video,
//         lesson_id: findLessonId.data[0].lesson_id,
//         priority: findAllSublesson.data.length + 1,
//       };
//     });
//     const sublessonsCreatedAt = await supabase
//       .from("sub_lessons")
//       .upsert(lessonMap);
//     console.log(sublessonsCreatedAt);

//     console.error("Error in courseIdUpdatedAt: ", courseIdUpdatedAt);
//     console.error("Error in lessonCreated: ", lessonCreated);
//     console.error("Error in findLessonId: ", findLessonId);

//     if (
//       courseIdUpdatedAt.status === 200 &&
//       lessonCreated.status === 201 &&
//       sublessonsCreatedAt.status === 201
//     ) {
//       return res.json({ message: "Lesson created successfully" });
//     } else {
//       return res.status(400).send("API error");
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// update lesson and sublesson *not finush*
adminRouter.put("/updated/:lessonId", async (req, res) => {
  const lessonName = {
    lesson_name: req.body.lesson_name,
    lesson_created_at: new Date(),
  };
  const allSublessons = req.body.sub_lessons.map((sub_lesson) => {
    return {
      lesson_id: req.body.lesson_id,
      sub_lesson_name: req.body.sub_lesson_name,
      sub_lesson_video: req.body.sub_lesson_video,
      priority: req.body.priority,
    };
  });
  try {
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//test upload vedio file
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const multerUpload = multer({ storage: multer.memoryStorage() });
const videosUpload = multerUpload.fields([{ name: "videos" }]);
adminRouter.post("/upload", videosUpload, async (req, res) => {
  const files = req.files["videos"];
  console.log(files);
  try {
    for (const file of files) {
      const { originalname, buffer } = file;
      const { data, error } = await supabase.storage
        .from("test_upload/video")
        .upload(Date.now() + "_" + originalname, buffer);
      console.log(data);
      if (error) {
        return res.status(500).json({ error: "Upload video error!" });
      }
    }
    return res.status(200).json({ success: "Upload video successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
  // console.log(req.files);
});

export default adminRouter;
