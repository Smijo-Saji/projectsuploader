import React, { createContext, useState } from "react";

export const addResponseContext = createContext();
export const editResponseContext = createContext();
export const profileUpdateContext = createContext();

function ContextShare({ children }) {
  const [addUpdate, setAddUpdate] = useState(false);
  const [editUpdate, setEditUpdate] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  return (
    <>
      <profileUpdateContext.Provider value={{ editProfile, setEditProfile }}>
        <editResponseContext.Provider value={{ editUpdate, setEditUpdate }}>
          <addResponseContext.Provider value={{ addUpdate, setAddUpdate }}>
            {children}
          </addResponseContext.Provider>
        </editResponseContext.Provider>
      </profileUpdateContext.Provider>
    </>
  );
}

export default ContextShare;
