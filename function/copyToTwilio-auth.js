module.exports = {
    check: function (phone) {
        if (this.auth.includes(phone)) {
            return true
        }
        else {
            return false
        }
    },
    auth: [
        '+1.....',  //Numbers that can use the elevated stuff.  You get the point. 
       

    ]
}