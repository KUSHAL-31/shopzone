class Features {
    constructor(query, str) {
        this.query = query;
        this.str = str;
    }
    search() {
        const keyword = this.str.keyword ? {
            name: {
                $regex: this.str.keyword,
                $options: "i",
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const filterStr = { ...this.str };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(field => delete filterStr[field]);

        let str = JSON.stringify(filterStr);
        str = str.replace(/\b(gt|lt|gte|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(str));
        return this;
    }

    pagination(productPerPage) {
        const currPage = Number(this.str.page) || 1;
        const skip = productPerPage * (currPage - 1);
        this.query = this.query.limit(productPerPage).skip(skip)

        return this;
    }
}

module.exports = Features;