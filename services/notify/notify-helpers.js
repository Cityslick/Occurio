const Notify = require('app-notify');
const notify = new Notify(cfg);

let cfg = {};

//setup smtp server
cfg.smtp = {
    host: xxx,
    user: user,
    pass: pass,
    port: port
};

//setup email headers
cfg.email = {
    to: 'user@example.com',
    from: 'sender@example.com'
};

//send an email
notify.email({
    subject: 'This is a test',
    message: 'Hello world!'
})
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.error(err);
});
