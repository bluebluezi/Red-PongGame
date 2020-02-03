
self.addEventListener('message', function (e) {
    let data = e.data;
    if (data.cmd === 'GO') {
        let meteorInterval = setInterval(meteorTimer(), e.delay * 1000);

        function meteorTimer() {
            //post resetmeteor
            self.postMessage('resetmeteor');
        }
    }

});
