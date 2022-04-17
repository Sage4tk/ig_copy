import React, { Dispatch, useState, useRef, useEffect } from "react";

//firebase
import app from "../../firebase";
import "firebase/compat/storage";

//context
import { useUser } from "../../context/AuthContext";

const storage = app.storage();

interface AddProps {
    open: boolean,
    setOpen: Dispatch<any>
}

const Post:React.FC<AddProps> = ({ open, setOpen }) => {

   

    //ref for input
    const fileRef = useRef<any>();
    
    const [formHandler, setFormHandler] = useState<any>({
        caption:"",
        img:""
    })

    //current page
    const [page, setPage] = useState(0);

    //img checker
    const checkImg = (event:any) => {
        //check if image is jpg jpeg or png
        const imgName = event.target.files[0].name;

        if (imgName.slice(-4) === ".jpg" || (imgName.slice(-4) === ".png" || imgName.slice(-5) === ".jpeg")) {
            setFormHandler({...formHandler,img:event.target.files[0]});
            setPage(1)
        };

    }

    //close Post and reset image upload
    const closeReset = () => {
        setFormHandler({
            ...formHandler,
            img: ""
        })
        setPage(0);
        setPriviewImg(null);
        setOpen(false);
    }

    //image preview
    const [previewImg, setPriviewImg] = useState<any>();

    useEffect(() => {
        if(!formHandler.img) return;

        const convertFile:any = new FileReader();

        convertFile.onload = () => {
            setPriviewImg(convertFile.result)
        }

        convertFile.readAsDataURL(formHandler.img);
    }, [formHandler.img])

    //submit image to firebase storage and write on firebase db
    const submitForm = () => {
        const uploadImg = storage.ref("Users/lol").put(formHandler.img);
    }

    if (!open) return (null)

    return (
        <>
        <div className="add-container" onClick={closeReset}>
        </div>
        <div className="add-window" style={{width: page === 0 ? "540px": "840px", marginLeft: page === 0 ? "-270px":"-420px"}}>
            <div style={{display: formHandler.img ? "none" : "block"}} >
                <div className="add-header" >
                    <p>Create new post</p>
                </div>
                <div className="add-body">
                    <div>
                        
                    </div>
                    <p>Drag photo here</p>
                    <input type="file" id="img" style={{display:"none"}} accept="image/*" ref={fileRef} onChange={checkImg} />
                    <label htmlFor="img">Select from computer</label>
                </div>
            </div>
            <ViewPage page={page} img={previewImg} formHandler={formHandler} setFormHandler={setFormHandler} />
            <button onClick={() => {submitForm()}}>upload</button>
        </div>
        </>
    )
}

interface viewProps {
    page: number,
    img: any,
    formHandler: object,
    setFormHandler: any
}

const ViewPage:React.FC<viewProps> = ({ page, img, formHandler, setFormHandler }) => {

    const { user } = useUser();

    const [txtLength, setTxtLength] = useState(0);

    const inputHandler = (e:any) => {
        if (e.target.value.length <= 200) {
            setTxtLength(e.target.value.length)
            setFormHandler({...formHandler, caption: e.target.value})
        } 
    }

    if (page !== 1) return (null);

    return (
        <>
        <div className="add-header">
            <p>Create new post</p>
        </div>
        <div className="comment-img">
            <img src={img} />
            <div className="comment-input">
                <div className="comment-header">
                    <img src={user.photoURL} />
                    <p>{user.displayName}</p>
                </div>
                <textarea placeholder="Write a caption..." onChange={inputHandler} maxLength={200} />
                <p className="limit">{txtLength}/200</p>
            </div>
        </div>
        </>
    )
}


export default Post;