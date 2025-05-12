
import Post from '../post/post.model.js';
import Course from '../course/course.model.js';

export const createDefaultPosts = async () => {
  const defaultCourses = ["Taller", "Tecnología", "Práctica Supervisada"];

  const defaultPosts = {
    "Taller": [
      {
        title: "Laboratorio #1 - Página Web",
        description: "Fue un reto porque no sabía mucho de HTML y fue una buena experiencia de aprendizaje."
      },
      {
        title: "Laboratorio #2 - Funcionalidades",
        description: "Un verdadero reto, ya que no comprendía mucho Node.js y no estaba familiarizado."
      },
      {
        title: "Laboratorio #3 - Análisis COPEREX",
        description: "Me sentí cómodo con Node.js y su estructura."
      },
      {
        title: "Evaluación Técnica Bimestral",
        description: "Un proyecto extenso que salió adelante con dedicación."
      },
      {
        title: "Proyecto Bimestral II (35%)",
        description: "Trabajado con Scrum, fue un poco complicado al inicio."
      },
    ],
    "Tecnología": [
      {
        title: "Actividad #1 - Infografía HTML/CSS",
        description: "Presentación introductoria al mundo de CSS y HTML."
      },
      {
        title: "Actividad #2 - Mapa conceptual",
        description: "Investigación sobre tecnologías del bimestre."
      },
      {
        title: "Actividad #3 - Mapa mental",
        description: "Me ayudó a entender mejor la web y sus características."
      },
      {
        title: "Actividad #4 - Infografía sobre React",
        description: "Me permitió comprender mejor el entorno de React."
      }
    ],
    "Práctica Supervisada": [
      {
        title: "Laboratorio #1 - Agenda Web",
        description: "Proyecto para adaptarse a JavaScript."
      },
      {
        title: "Laboratorio #2 - Admin de alumnos",
        description: "Uno de los primeros proyectos con Node.js, difícil pero alcanzable."
      },
      {
        title: "Laboratorio #3 - Gestor de opiniones",
        description: "Me sentí conforme con el resultado."
      },
      {
        title: "Laboratorio #4 - Almacenadora",
        description: "Experiencia nueva siendo Scrum Master, todo un reto."
      }
    ]
  };

  try {
    for (const courseName of defaultCourses) {
      const course = await Course.findOne({ name: courseName });

      if (course) {
        for (const postData of defaultPosts[courseName]) {
          const existingPost = await Post.findOne({
            title: postData.title,
            course: course._id,
          });

          if (!existingPost) {
            const post = new Post({
              title: postData.title,
              description: postData.description,
              course: course._id,
            });
            await post.save();
            console.log(`Post "${post.title}" creado en el curso "${courseName}"`);
          } else {
            console.log(`ℹPost "${postData.title}" ya existe en el curso "${courseName}"`);
          }
        }
      } else {
        console.log(`El curso "${courseName}" no existe.`);
      }
    }
  } catch (error) {
    console.error("Error al crear los posts por defecto:", error.message);
  }
};


export const getPostsByCourseName = async (req, res) => {
  const { courseName } = req.params;

  try {
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: `El curso "${courseName}" no existe.` });
    }

    const posts = await Post.find({ course: course._id }).populate("course", "name");

    if (posts.length === 0) {
      return res.status(404).json({ message: `No se encontraron publicaciones para el curso "${courseName}"` });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener los posts por nombre de curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
