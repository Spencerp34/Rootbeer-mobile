import * as yup from "yup";

const schema = yup.object().shape({
    brand_name: yup.string().required(),
    author_review: yup.number().min(1).max(5).required(),
    shop_url: yup.string().optional(),
    review_description: yup.string().required(),
    review_img: yup.optional(),
});

export default schema;