const { Router } = require('express');
const router = Router();
const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { password } = req.body;

    // Get password from pass.json file
    const passConfigStr = fs.readFileSync(path.join(__dirname, '../', 'pass.json'), 'utf-8');
    const passConfig = JSON.parse(passConfigStr);
    const { pass } = passConfig;

    if (password === pass) {
        req.session.logged = true;
        res.send({
            res: 'OK'
        });
    }else{
        res.send({
            res: null
        });
    }
});

router.delete('/login', (req, res) => {
    req.session.destroy();
    res.send('OK');
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../' ,'/views/dashboard.html'));
});

router.get('/view/:id/:screenX/:screenY', (req, res) => {
    res.render('viewer', {
        id: req.params.id,
        screenX: req.params.screenX,
        screenY: req.params.screenY
    });
});

router.get('/*', (req, res, next) => {
    let url = req.originalUrl;
    if (!/[/]peerjs[/]\w*/.test(url)) res.status(404).redirect('/dashboard');
    next();
});

module.exports = router;