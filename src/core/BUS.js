export default {
    el : document.createElement('div'),

    dispatch: function(e, datas){
        let event = new CustomEvent(e, {detail: datas || {}});
        this.el.dispatchEvent(event);
    },

    listen: function(e, method, scop){
        this.el.addEventListener(e, method.bind(scop));
    }
};