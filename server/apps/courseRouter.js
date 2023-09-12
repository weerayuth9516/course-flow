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

    // Check if the course with courseId exists
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
//here
//myCoursesPage/BE sprint2
// ทำต่อ courseRouter.get("/:userId/mycourses", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Query the user_course_details table to fetch courses in progress for the user
//     const { data, error } = await supabase
//       .from("user_course_details")
//       .select("*")
//       .eq("user_id", userId);

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     // Filter the in-progress courses based on the subscription_id
//     const in_progress = data.filter((user_course_detail_obj) => {
//       return user_course_detail_obj.subscription_id === "2";
//     });

//     // Extract the courseIds from in-progress courses
//     const courseIds = in_progress.map((course) => course.course_id);

//     // Query the courses table to fetch details of the in-progress courses
//     const { data: courseDetailData, error: courseError } = await supabase
//       .from("courses")
//       .select("course_name", "course_summary", "course_duration")
//       .in("course_id", courseIds);

//     if (courseError) {
//       return res.status(500).json({ error: courseError.message });
//     }

//     return res.json({
//       in_progress: in_progress,
//       course_details: courseDetailData,
//     });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//here
// courseRouter.get("/:userId/mycourses", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Query the user_course_details table to fetch courses in progress for the user
//     const { data, error } = await supabase
//       .from("user_course_details")
//       .select("*")
//       .eq("user_id", userId);

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     // Filter the in-progress courses based on the subscription_id
//     const in_progress = data.filter((user_course_detail_obj) => {
//       return (
//         user_course_detail_obj.subscription_id ===
//         "46004adc-8589-4254-878f-c03a6ae7cea2"
//       );
//     });

//     // Extract the courseIds from in-progress courses
//     const courseIds = in_progress.map((course) => course.course_id);

//     // Query the courses table to fetch details of the in-progress courses
//     const { data: courseDetailData, error: courseError } = await supabase
//       .from("courses")
//       .select("course_name", "course_summary", "course_duration")
//       .in("course_id", courseIds);

//     if (courseError) {
//       return res.status(500).json({ error: courseError.message });
//     }

//     return res.json({
//       in_progress: in_progress,
//       course_details: courseDetailData,
//     });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//myCoursesPage/BE sprint2 in_progress postman
courseRouter.get("/:userId/mycourses", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query the user_course_details table to fetch courses in progress for the user
    const { data, error } = await supabase
      .from("user_course_details")
      .select("*")
      .eq("user_id", userId);

    // .like("status_status", "%in_progress%");
    const in_progress = data.filter((user_course_detail_obj) => {
      return (
        // user_course_detail_obj.subscription_status === "subscribed_course"
        user_course_detail_obj.subscription_id === 1
      );
    });
    return res.json({
      in_progress,
    });

    // if (error) {
    //   return res.status(500).json({ error: error.message });
    // }

    // if (!data || data.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ error: "No courses in progress found for the user" });
    // }

    // // Extract course IDs from the data
    // const courseIds = data.map((userCourse) => userCourse.course_id);

    // // Query the database to fetch details of the subscribed courses
    // const { data: courseDetailData, error: courseError } = await supabase
    //   .from("courses")
    //   .select("course_name", "course_summary", "course_duration")
    //   .eq("course_id", courseIds);

    // if (courseError) {
    //   return res.status(500).json({ error: courseError.message });
    // }

    // if (!courseDetailData || courseDetailData.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ error: "No course details found for the user" });
    // }

    // return res.json({
    //   data: courseDetailData,
    // });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default courseRouter;
