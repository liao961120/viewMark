export default {
    methods: {
        attachH6: function() {
            // Printing: attach h6 info to its first paragraph
            var h6 = document.querySelectorAll('h6');
            if (h6) {
                h6.forEach(ele => {
                    ele.nextElementSibling.setAttribute('data-h6', ele.innerText + '   ');
                });
            }
        },

    }
}