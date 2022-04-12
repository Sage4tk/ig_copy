import React, { Dispatch, useState, useRef, useEffect } from "react";

interface AddProps {
    open: boolean,
    setOpen: Dispatch<any>
}

const Post:React.FC<AddProps> = ({ open, setOpen }) => {

    //ref for input
    const fileRef = useRef<any>();
    
    const [formHandler, setFormHandler] = useState({
        caption:"",
        img:""
    })

    //current page
    const [page, setPage] = useState(0);

    //img checker
    const checkImg = (event:any) => {
        if (event.target.files && event.target.files.length === 1) {
            setFormHandler({...formHandler,img:event.target.files[0]});
            setPage(1)
        }
    }

    //image preview
    const [previewImg, setPriviewImg] = useState();

    useEffect(() => {
        if(!formHandler.img) return;

        const convertFile:any = new FileReader();

        convertFile.onload = () => {
            setPriviewImg(convertFile.result)
        }

        convertFile.readAsDataURL(formHandler.img);
    }, [formHandler.img])

    if (!open) return (null)

    return (
        <>
        <div className="add-container" onClick={() => {setOpen(!open)}}>
        </div>
        <div className="add-window">
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
            <ViewPage page={page} img={previewImg} />
        </div>
        </>
    )
}

interface viewProps {
    page: number,
    img: any
}

const ViewPage:React.FC<viewProps> = ({ page, img }) => {

    if (page !== 1) return (null);

    return (
        <>
        <div className="add-header">
            <p>Create new post</p>
        </div>
        <img src={img} />
        </>
    )
}


export default Post;