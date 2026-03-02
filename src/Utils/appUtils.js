export const Utils = {
    sortAndDedupe(array) {
        // First remove duplicates, then sort
        const uniqueArray = [...new Set(array)];
        
        return uniqueArray.sort((a, b) => {
            if (a == null && b == null) return 0;
            if (a == null) return 1;
            if (b == null) return -1;
            
            const typeA = typeof a;
            const typeB = typeof b;
            
            if (typeA !== typeB) {
                const order = { 'number': 1, 'string': 2, 'boolean': 3, 'object': 4 };
                return (order[typeA] || 99) - (order[typeB] || 99);
            }
            
            if (typeA === 'number') return a - b;
            if (typeA === 'string') return a.localeCompare(b);
            if (typeA === 'boolean') return (a === b) ? 0 : a ? 1 : -1;
            
            return String(a).localeCompare(String(b));
        });
    }
}
