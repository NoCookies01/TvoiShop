import React, { useState } from "react";

export const OnConfirmOrderWindow = ({onOk, onCancel}:any) => {

    const[vorName, setVorName] = useState("");
    const[lastName, setLastName] = useState("");
    const[phone, setPhone] = useState(0);
    const[email, setEmail] = useState("");
    const[town, setTown] = useState("");
    const[post, setPost] = useState("");
    const[department, setDepartment] = useState(0);


    const checkTextInput = (event: any) => {
        if (!vorName.trim()) {
            alert("You couldn`t set empty field")
            return;
        }
        onOk()
      };

    return(
        <div className="windowConfirmPosition"> 
            <div className="windowConfirmStyle">

                <div className="confirmText">To confirm your order please fill all fields</div>

                <form>
                    <div>
                    <input type="text" 
                    placeholder="Enter your Vorname" 
                    className="inputStyle" 
                    onChange={(event) => setVorName(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder="Enter your Lastname" 
                    className="inputStyle" 
                    onChange={(event) => setLastName(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder="Enter your Phone Number" 
                    className="inputStyle" 
                    onChange={(event) => setPhone(event.target.valueAsNumber)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder="Enter your E-mail" 
                    className="inputStyle" 
                    onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder="Enter your Town" 
                    className="inputStyle" 
                    onChange={(event) => setTown(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder="Enter your Post" 
                    className="inputStyle" 
                    onChange={(event) => setPost(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder="Enter your Department number" 
                    className="inputStyle" 
                    onChange={(event) => setDepartment(event.target.valueAsNumber)}/>
                    </div>
                </form>

                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle" onClick={() => checkTextInput(event)}>Ok</button>
                        <button className="btnHomeStyle"onClick={() => onCancel()}>Cancel</button>
                    </div>
            </div>
        </div>
    )
}