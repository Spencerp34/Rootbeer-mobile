import * as yup from "yup";

const schema = yup.object().shape({
    brand_name: yup.string().required("Name required"),
    author_review: yup.number().min(1, "Must be 1-5").max(5, "Must be 1-5").required(),
    shop_url: yup.string().optional().url(),
    review_description: yup.string().required("Review required"),
    review_img: yup.object().optional().nullable(),
});

export default schema;