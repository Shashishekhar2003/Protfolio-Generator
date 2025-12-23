import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function Card({ project }) {
  return (
    <div className="max-w-2xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl  bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col w-full">
      <a href="#">
        <img
          className="rounded-t-lg w-full h-auto object-cover"
          src={project.img}
          alt={`${project.name} Project Image`}
        />
      </a>

      <div className="p-5 flex flex-col flex-grow">
        <a href="#">
          <h6 className="project-name mb-2 text-2xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.pname}
          </h6>
        </a>
        <p
          id="des"
          className="project-description mb-3 text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400 "
        >
          {project.description}
        </p>

        <a
          href={project.link}
          className="project-link inline-flex items-center px-3 py-2 text-sm sm:text-sm md:text-base font-medium text-center text-white bg-[#F08080] rounded-lg hover:bg-[#E06E6E] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-[#E06E6E] dark:focus:ring-blue-800 self-center  mt-auto"
        >
          visit&nbsp;<span id="p-link">project</span>
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

function Certificate({ certificate }) {
  return (
    <>
      <figure className="max-w-lg flex flex-col items-center">
        <img
          className="h-auto max-w-xl rounded-lg"
          src={certificate.cimg}
          alt="image description"
        />
        <figcaption className="mt-2 text-xl text-center text-amber-600 dark:text-amber-400 uppercase">
          {certificate.cname}
        </figcaption>
        <a
          href={certificate.clink}
          className="project-link uppercase inline-flex items-center px-5 py-2 text-sm sm:text-sm md:text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-[#F08080] hover:bg-[#E06E6E]  focus:ring-blue-300  dark:focus:ring-blue-800 self-center  mt-4"
        >
          validate
        </a>
      </figure>
    </>
  );
}

function Webpage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const { portfolioId } = useParams(); // Get portfolioId from URL

  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Portfolio ID:", portfolioId); // Check if this logs the correct ID
    async function fetchData() {
      try {
        // Fetch document based on portfolioId
        const docRef = doc(db, "portfolios", portfolioId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data()); // Set data in state
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    if (portfolioId) {
      fetchData();
    }
  }, [portfolioId]);

  if (!data)
    return (
      <p className="flex justify-center items-center w-full h-screen text-2xl">
        Loading...
      </p>
    );

  return (
    <>
      <div id="main">
        <nav className="fixed top-0 left-0 w-full z-10 bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href={`${data.linkedin || "www.linkein.com"}`}
              target="_blank"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://i.pinimg.com/originals/5d/12/d0/5d12d0e14bd2110a430aa44555a2bdcb.png"
                className="h-10 rounded-md"
                alt="coder"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white uppercase">
                {data.firstName || "Guest"} {data.lastName || ""}
              </span>
            </a>
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              ref={menuRef}
              className={`${
                isMenuOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium text-lg flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded md:bg-transparent hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#s"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#p"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#c"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Certificates
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${data.email || "default@gmail.com"}`}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <header className="intro">
        <h1 className="intro_hello">Hello!</h1>
        <span id="wave_hand">
          <img src={`/images/waving-hand.png`} alt="Waving Hand" />
        </span>
      </header>
      <section className="section">
        <div className="content">
          <div className="name">
            <h1 className="name_text">
              I'M {data.firstName}{" "}
              <span className="lname"> {data.lastName}</span>
              <br />
            </h1>
            <h2 className="slogen">
              <span id="slogen_span">Creative</span>&nbsp;Designer
            </h2>
          </div>
          <div className="contact_btn">
            <button
              onClick={() => (window.location.href = `mailto:${data.email}`)}
            >
              Connect with me
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="section display section-offset" id="s">
        <div className="section_title">Skills</div>
        <div className="section_content">
          {data.skills && data.skills.length > 0 ? (
            data.skills.map((skill, index) => {
              const skillImagePath = `/images/${skill.toLowerCase()}.png`; // Match image name based on skill

              return (
                <div className="skill_content" key={index}>
                  <img
                    src={skillImagePath}
                    alt={skill}
                    onError={(e) => {
                      e.target.src = "/images/notfound.png";
                    }} // Fallback image
                    className="skill-logo"
                  />
                  <p>{skill}</p>
                </div>
              );
            })
          ) : (
            <p>No skills provided.</p>
          )}
        </div>
      </section>

      <section className="section display" id="p">
        <div className="section_title">projects</div>
        <div className="project_container">
          {data.projects.length > 0 ? (
            data.projects.map((project, index) => (
              <Card key={index} project={project} />
            ))
          ) : (
            <p>No projects to display.</p>
          )}
        </div>
      </section>

      <section className="section display certificate_container" id="c">
        <div className="section_title">certificates</div>
        <div className="project_container c_container">
          {data.certificates.length > 0 ? (
            data.certificates.map((certificate, index) => (
              <Certificate key={index} certificate={certificate} />
            ))
          ) : (
            <p>No Certificates to Display</p>
          )}
        </div>
      </section>

      <footer
        id="footer"
        className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 py-10 px-10 font-sans tracking-wide"
      >
        <div className="max-w-2xl mx-auto text-center">
          <a href={`${data.linkedin}`} className="inline-block">
            <svg height="40" width="200" xmlns="http://www.w3.org/2000/svg">
              <text
                x="5"
                y="30"
                fontSize="35"
                fill="#b3e5fc"
                fontFamily="Poppins, sans-serif"
              >
                About Me
              </text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </a>
          <p className="text-md mt-6 text-slate-300 px-4 sm:px-8 md:px-12">
            {data.aboutuser}
          </p>

          <ul className="flex items-center justify-center flex-wrap gap-y-3 gap-x-6 mt-8">
            <li>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-6 h-6"
                  viewBox="0 0 176 176"
                >
                  <g data-name="Layer 2">
                    <rect
                      width="176"
                      height="176"
                      fill="#0077b5"
                      data-original="#0077b5"
                      rx="24"
                    />
                    <path
                      fill="#fff"
                      d="M63.4 48a15 15 0 1 1-15-15 15 15 0 0 1 15 15zM60 73v66.27a3.71 3.71 0 0 1-3.71 3.73H40.48a3.71 3.71 0 0 1-3.72-3.72V73a3.72 3.72 0 0 1 3.72-3.72h15.81A3.72 3.72 0 0 1 60 73zm82.64 34.5v32.08a3.41 3.41 0 0 1-3.42 3.42h-17a3.41 3.41 0 0 1-3.42-3.42v-31.09c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86A3.42 3.42 0 0 1 90.3 143H73.88a3.41 3.41 0 0 1-3.41-3.42V72.71a3.41 3.41 0 0 1 3.41-3.42H90.3a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.82 9.63-10.31 21.9-10.31 27.18 0 27.02 25.38 27.02 39.32z"
                      data-original="#ffffff"
                    />
                  </g>
                </svg>
              </a>
            </li>

            <li>
              <a href={data.github} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="30px"
                  fill="#007bff"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6a3.2 3.2 0 0 0-1.3-1.7c-1-.7.1-.7.1-.7a2.6 2.6 0 0 1 2 1.3 2.7 2.7 0 0 0 3.6 1 2.7 2.7 0 0 1 .8-1.7c-2.6-.3-5.3-1.3-5.3-6a4.5 4.5 0 0 1 1.2-3.2 4.2 4.2 0 0 1 .1-3.1s1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2a4.2 4.2 0 0 1 .1 3.1 4.5 4.5 0 0 1 1.2 3.2c0 4.7-2.7 5.6-5.3 6a3 3 0 0 1 .9 2.3v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 0Z" />
                </svg>
              </a>
            </li>

            <li>
              <a href={`mailto:${data.email || "default@gmail.com"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="30px"
                  fill="#007bff"
                  viewBox="0 0 479.058 479.058"
                >
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <ul className="li-links flex flex-wrap justify-center items-center gap-x-20 gap-y-9 mt-20 ml-20">
          <li className="flex items-center flex-col sm:flex-row sm:items-center">
            <div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="#007bff"
                viewBox="0 0 448 512"
              >
                <path d="M100.28 448H7.4V148.9h92.88zm-46.4-339.6c-31.47 0-56.8-25.33-56.8-56.7S22.41 0 53.88 0s56.8 25.33 56.8 56.7-25.34 56.7-56.8 56.7zm384.3 339.6h-92.68V302.4c0-34.6-12.45-58.2-43.56-58.2-23.8 0-37.93 16-44.16 31.6-2.3 5.6-2.87 13.4-2.87 21.3V448h-92.78s1.24-239.1 0-264.1h92.78v37.5c12.3-19 34.33-46.3 83.46-46.3 61 0 106.74 39.9 106.74 125.5V448z" />
              </svg>
            </div>
            <a
              href={`${data.linkedin || "https://www.linkein.com"}`}
              target="_blank"
              className="text-blue-500 text-sm ml-3"
            >
              <small className="block">Linked In</small>
              <strong className="footer-text uppercase">
                {data.firstName} {data.lastName}
              </strong>
            </a>
          </li>

          <li className="flex items-center flex-col sm:flex-row sm:items-center">
            <div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="#007bff"
                viewBox="0 0 479.058 479.058"
              >
                <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
              </svg>
            </div>
            <a
              href={`mailto:${data.email || "default@gmail.com"}`}
              className="text-blue-500 text-sm ml-3"
            >
              <small className="block">Mail</small>
              <strong className="footer-text">{data.email}</strong>
            </a>
          </li>

          <li className="flex items-center flex-col sm:flex-row sm:items-center">
            <div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="#007bff"
                viewBox="0 0 24 24"
              >
                <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6a3.2 3.2 0 0 0-1.3-1.7c-1-.7.1-.7.1-.7a2.6 2.6 0 0 1 2 1.3 2.7 2.7 0 0 0 3.6 1 2.7 2.7 0 0 1 .8-1.7c-2.6-.3-5.3-1.3-5.3-6a4.5 4.5 0 0 1 1.2-3.2 4.2 4.2 0 0 1 .1-3.1s1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2a4.2 4.2 0 0 1 .1 3.1 4.5 4.5 0 0 1 1.2 3.2c0 4.7-2.7 5.6-5.3 6a3 3 0 0 1 .9 2.3v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 0Z" />
              </svg>
            </div>
            <a
              href={`${data.github}`}
              target="_blank"
              className="text-blue-500 text-sm ml-3"
            >
              <small className="block">Github</small>
              <strong className="footer-text">
                {data.github || "Not Available"}
              </strong>
            </a>
          </li>
        </ul>

        <hr className="my-10 border-gray-500" />

        <div className="flex max-md:flex-col gap-4 justify-center items-center">
          <p className="text-md text-gray-200 text-center">
            © Designed & Developed by <br />
            <span className="uppercase block text-center text-[goldenrod]">
              {data.firstName} {data.lastName}.{" "}
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Webpage;
