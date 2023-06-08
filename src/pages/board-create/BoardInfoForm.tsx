import React, {useState} from 'react';
import {Button, Form, Schema} from 'rsuite';
import Textarea from '@/components/Textarea';
import IconUploader from "@/pages/board-create/IconUploader";
import { collection, setDoc, doc } from "firebase/firestore";
import {db} from "@/firebase";
import {useNavigate} from "react-router-dom";

import 'rsuite-color-picker/lib/styles.css';


const model = Schema.Model({
    icon: Schema.Types.StringType(),
    name: Schema.Types.StringType().isRequired('This field is required.'),
    description: Schema.Types.StringType()
});
const BoardInfoForm = () => {
    const formRef: any = React.useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [, setFormError] = React.useState({});
    const [iconURL, setIconURL] = useState<string>();
    const [formValue, setFormValue] = React.useState<Record<string, any>>({
        icon: '',
        name: '',
        description: '',
    });


    const handleSubmit = async () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }
        setLoading(true);
        formValue.icon = iconURL;
        console.log(formValue, 'Form Value');
        const dbRef = doc(collection(db, "boards"));
        await setDoc(dbRef, formValue);
        setLoading(false);
        navigate('/');
    };

    return (
        <Form
            model={model}
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}>
            <div style={{marginBottom: 30}}>
                <h5>Board Info</h5>
                <p className="text-muted">Create a blank board to plan your task items. You can freely design
                    the content of the Kanban board.</p>
            </div>


            <Form.Group controlId="icon">
                <Form.ControlLabel>Board Icon</Form.ControlLabel>
                <Form.Control name="icon" accepter={IconUploader} setIconURL={setIconURL}/>
            </Form.Group>

            <Form.Group controlId="name">
                <Form.ControlLabel>Board Name</Form.ControlLabel>
                <Form.Control name="name"/>
                <Form.HelpText>Board name must be unique.</Form.HelpText>
            </Form.Group>

            <Form.Group controlId="description">
                <Form.ControlLabel>Board description (optional)</Form.ControlLabel>
                <Form.Control name="description" accepter={Textarea}/>
            </Form.Group>

            <Button appearance="primary" onClick={handleSubmit} loading={loading}>
                Submit
            </Button>
        </Form>
    );
};

export default BoardInfoForm;
