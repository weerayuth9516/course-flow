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
    const lessonData = data;

    return res.json({
      data: lessonData,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//myCoursesPage/BE sprint2

courseRouter.get("/mycourses/:id", async (req, res) => {
  try {
    // Retrieve the authenticated user's ID
    const id = req.params.id;

    const results = await supabase.from("users").select("*").eq("user_id", id);

    // Query the database to fetch subscribed courses for the user
    const { data: userCoursesData, error: userCoursesError } = await supabase
      .from("user_course_details")
      .select("course_id")
      .eq("user_id", id);

    if (userCoursesError) {
      return res.status(500).json({ error: userCoursesError.message });
    }

    if (!userCoursesData || userCoursesData.length === 0) {
      return res.status(404).json({ error: "No subscribed courses found" });
    }

    const courseIds = userCoursesData.map((userCourse) => userCourse.course_id);

    // Query the database to fetch course details for the subscribed courses
    const { data: subscribedCoursesData, error: subscribedCoursesError } =
      await supabase
        .from("courses")
        .select("course_id", "course_name", "course_summary")
        .in("course_id", courseIds);

    if (subscribedCoursesError) {
      return res.status(500).json({ error: subscribedCoursesError.message });
    }

    if (!subscribedCoursesData || subscribedCoursesData.length === 0) {
      return res.status(404).json({ error: "No subscribed courses found" });
    }

    const subscribedCoursesArray = subscribedCoursesData.map((course) => ({
      course_id: course.course_id,
      course_name: course.course_name,
      course_summary: course.course_summary,
    }));

    res.json(subscribedCoursesArray);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// courseRouter.get("/:id/lessons/:lessonId", async (req, res) => {
//   try {
//     const courseId = req.params.id;
//     const lessonId = req.params.lessonId;

//     const { data, error } = await supabase
//       .from("courses")
//       .select("*,lessons(*)")
//       .eq("course_id", courseId)
//       .eq("lessons.lesson_id", lessonId);

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     if (data.length === 0 || !data[0].lessons) {
//       return res.status(404).json({ error: "Lesson not found" });
//     }

//     const lesson = data[0].lessons.find((l) => l.lesson_id === lessonId);

//     if (!lesson) {
//       return res.status(404).json({ error: "Lesson not found" });
//     }

//     return res.json({ lesson });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

export default courseRouter;
