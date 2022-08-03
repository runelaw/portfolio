import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./contact.scss";

const Contact = ({ swipe }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      {swipe === 1 && (
        <h2 className="contact-head">
          It's a <span>match!</span>
          <br />
          Drop me a message and let me know.
        </h2>
      )}
      {swipe === 0 && (
        <h2 className="contact-head">
          Let us <span>Chat.</span>
          <br />
          Drop me a text
        </h2>
      )}
      {swipe === -1 && (
        <h2 className="contact-head">
          Please drop me a <span>message.</span>
          <br />
          and let me know how I can improve.
        </h2>
      )}
      {!isFormSubmitted ? (
        <div className="app__contact-container app__flex">
          <div className="app__contact-form app__flex">
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="app__flex">
              <input
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type="button" className="p-text" onClick={handleSubmit}>
              {loading ? "Sending Message" : "Send Message"}
            </button>
          </div>
          <div className="map-wrap">
            <MapContainer
              center={[30.70761781734809, 76.74439448705706]}
              zoom={12}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[30.70761781734809, 76.74439448705706]}>
                <Popup>
                  Please <br /> {"Don't stalk me :)"}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="header-text">Thank You for getting in Touch</h3>
        </div>
      )}
      <div className="copyright">
        <p className="p-text">@2022 Prakhar</p>
        <p className="p-text">All rights reserved.</p>
        <p className="p-text">Just joking, copy away.</p>
        <p className="p-text">I copy lotta stuff too.</p>
      </div>
    </>
  );
};

export default AppWrap({ idName: "contact", classNames: "app__whitebg" })(
  MotionWrap({ classNames: "app__contact" })(Contact)
);
