import React, { Dispatch, useState, useRef, useEffect } from "react";

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

    if (!open) return (null)

    return (
        <>
        <div className="add-container" onClick={closeReset}>
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
            <button onClick={() => {console.log(formHandler.img.name)}} >LOL</button>
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