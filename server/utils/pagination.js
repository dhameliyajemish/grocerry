const Pagination = (page, JSON, itemsPerPage = 20) => {
    try {
        // Fix: Use Array.from or for...of instead of for...in to prevent pushing prototype functions 
        // into the array when dealing with Mongoose Document arrays.
        const array = Array.from(JSON || []);

        const arraySize = array.length;
        let desiredPage = 0;
        if (page && page !== 0) {
            desiredPage = parseInt(page) - 1;
        }

        const firstElement = (desiredPage * itemsPerPage);
        const lastElement = desiredPage * itemsPerPage + itemsPerPage;
        if (desiredPage === 0 || firstElement >= arraySize) {

            if (arraySize <= itemsPerPage)
                return (array);

            else
                return (array.slice(0, itemsPerPage));
        }

        return ((array.slice(firstElement, lastElement)));
    } catch (error) {
        throw error;
    }
}

export default Pagination;