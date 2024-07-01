import Form from "../models/Form.js";

export default class FormHelpers {
    parseContact(data) {
        const { name, lastname, email, telephone, message } = data;
        const form = new Form(name, lastname, email, parseInt(telephone), message);
        return form; 
    }
}


