export default {
    offset(page, perPage) {
        return perPage * (page - 1)
    },
    hasNext(page, perPage, total) {
        return total > (this.offset(page, perPage) + perPage)
    },
    hasPrevious(page, perPage) {
        return this.offset(page, perPage) > 0
    }
}