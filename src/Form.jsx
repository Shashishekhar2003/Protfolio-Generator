import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { savePortfolioData } from "./firestoreService";
import Webpage from "./webpage";

// function Form({ setUserData, userData, setFormSubmitted  }){
function Form({ portfolioId, data, onSubmit }) {
  const [userData, setUserData] = useState({});
  const [userSkills, setUserSkills] = useState([]);
  const [projectInput, setProjectInput] = useState({
    pname: "",
    img: "",
    link: "",
    description: "",
  });
  const [projects, setProjects] = useState([]); // New state to store all projects
  const [certificateInput, setCertificateInput] = useState({
    cname: "",
    cimg: "",
    clink: "",
  });
  const [certificates, setCertificates] = useState([]); // New state to store all projects
  // const [imagePreview, setImagePreview] = useState(null); // For displaying the uploaded image
  const navigate = useNavigate();

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const addProject = () => {
    if (projectInput.pname && projectInput.img && projectInput.link) {
      setProjects((prevProjects) => [...prevProjects, projectInput]);
      setProjectInput({ pname: "", img: "", link: "" }); // Clear input fields
    } else {
      alert("Please fill in all fields before adding a project.");
    }
  };
  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setCertificateInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const addCertificate = () => {
    if (
      certificateInput.cname &&
      certificateInput.cimg &&
      certificateInput.clink
    ) {
      setCertificates((prevProjects) => [...prevProjects, certificateInput]);
      setCertificateInput({ cname: "", cimg: "", clink: "" }); // Clear input fields
    } else {
      alert("Please fill in all fields before adding a project.");
    }
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    const skillsArray = value.split(",").map((skill) => skill.trim());
    setUserSkills(skillsArray);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReset = () => {
    localStorage.removeItem("submittedData"); // Clear data from localStorage
    const lable = document.querySelector("#lable");
    lable.innerHTML = "Reset Complete!!!";
    setInterval(() => {
      lable.innerHTML = " ";
    }, 2000);
    setUserData({});
    setUserSkills([]);
    setProjectInput({ pname: "", img: "", link: "" });
    setProjects([]);
    setCertificateInput({ cname: "", cimg: "", clink: "" });
    setCertificates([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Portfolio ID:", portfolioId);

    const lable = document.querySelector("#lable");
    const requiredFields = ["firstName", "lastName", "email", "aboutuser"];
    const isValid = requiredFields.every((field) => userData[field]);

    if (
      !isValid ||
      userSkills.length === 0 ||
      projects.length === 0 ||
      certificates.length === 0
    ) {
      lable.style.color = "red";
      lable.innerHTML =
        "Please fill out all required fields, add at least one skill, project, and certificate.";
      setTimeout(() => {
        lable.innerHTML = " ";
      }, 3000);
      return;
    }

    lable.innerHTML = "Submitted !!!";
    setTimeout(() => {
      lable.innerHTML = " ";
    }, 2000);

    // Store in Firestore
    try {
      const docRef = await addDoc(collection(db, "portfolios"), {
        ...userData,
        skills: userSkills,
        projects: projects,
        certificates: certificates,
        createdAt: new Date(),
      });

      // After submission, redirect to the webpage
      navigate(`/webpage/${docRef.id}`);
      alert(
        "Your portfolio has been successfully created! You will now be redirected to your portfolio page. Please copy the URL of that page to share and access your portfolio in the future."
      );
      // Open the webpage route in a new tab with the unique doc ID
      // window.open(`/webpage/${docRef.id}`, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="userform-container">
        <h2>User Details</h2>

        <form className="userform" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="firstName">First Name : </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName || ""}
              onChange={handleChange}
              placeholder="Enter First Name"
            ></input>
            <br />
            <label htmlFor="lastName">Last Name : </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName || ""}
              onChange={handleChange}
              placeholder="Enter Last Name"
            ></input>
            <br />
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              placeholder="Enter Email Id"
            ></input>
            <br />
            <label htmlFor="linkedin">Linkedin Id : </label>
            <input
              type="text"
              name="linkedin"
              value={userData.linkedin || ""}
              onChange={handleChange}
              placeholder="Enter Linkedin Id url"
            ></input>
            <br />
            <label htmlFor="github">GitHub Link : </label>
            <input
              type="text"
              name="github"
              value={userData.github || ""}
              onChange={handleChange}
              placeholder="Enter GitHub Link"
            ></input>
          </div>

          <br />

          <div className="skills">
            <label>Enter Skills :</label> <br />
            <textarea
              onChange={handleSkillChange}
              placeholder="Type skills separated by commas (e.g. JavaScript, React, Node.js)"
            />
          </div>
          <br />

          <div className="projects">
            <label>Enter Projects:</label>
            <br />
            <label htmlFor="pname">Project Name : </label>
            <input
              type="text"
              name="pname"
              value={projectInput.pname}
              onChange={handleProjectChange}
              placeholder="Enter project name"
            />
            <br />
            <label htmlFor="img">Project image url:</label>
            <input
              type="text"
              name="img"
              value={projectInput.img}
              onChange={handleProjectChange}
              placeholder="Enter image URL"
            />
            <span id="note">
              *Note: Upload images to GitHub Public Repo, open the image,
              right-click on the image, and select "Copy image address" for the
              URL.
            </span>
            <br />
            <br />

            <label htmlFor="link">Project Link :</label>
            <input
              type="text"
              name="link"
              value={projectInput.link}
              onChange={handleProjectChange}
              placeholder="Enter Project Link"
            />
            <br />
            <label htmlFor="description">Project Description :</label>
            <textarea
              name="description"
              id="description"
              value={projectInput.description || ""}
              onChange={handleProjectChange}
              placeholder="Enter short Description of your Project."
            />
            <div className="button-container">
              <button type="button" className="btn" onClick={addProject}>
                Add Project
              </button>
            </div>
          </div>
          <div className="certificates">
            <label>Upload Certificates :</label> <br />
            <label htmlFor="cname">Certificate Name :</label>
            <input
              type="text"
              name="cname"
              value={certificateInput.cname}
              onChange={handleCertificateChange}
              placeholder="Enter Certificate Name"
            />
            <br />
            <label htmlFor="cimg">Certificate img url :</label>
            <input
              type="text"
              name="cimg"
              value={certificateInput.cimg}
              onChange={handleCertificateChange}
              placeholder="Enter Certificate img url"
            />
            <span id="note">
              *Note: Use the same method as the "Project Image URL" to get and
              upload the URL for this field.
            </span>
            <br />
            <br />
            <label htmlFor="clink">Certificate Link :</label>
            <input
              type="text"
              name="clink"
              value={certificateInput.clink}
              onChange={handleCertificateChange}
              placeholder="Enter Certificate Link"
            />
            <br />
            <div className="button-container">
              <button className="btn" type="button" onClick={addCertificate}>
                Add Certificate
              </button>
            </div>
          </div>
          <div className="about">
            <label htmlFor="aboutuser">About Yourself :</label>
            <br />
            <textarea
              name="aboutuser"
              id="info"
              value={userData.aboutuser || ""}
              onChange={handleChange}
              placeholder="Tell us about yourself. Share your background, interests, and goals."
            />
          </div>
          <div className="formbtn">
            <button type="reset" onClick={handleReset}>
              Reset
            </button>
            <button type="submit">Submit</button>
          </div>
          <span id="lable"></span>
        </form>
      </div>
    </>
  );
}

export default Form;
