const { execSync } = require('child_process');
const { watch } = require('fs');

function _watch(){
	watch(__dirname, (eventType, filename) => {
		console.log('_watch()')
		if (filename != '.git') {
			const now = new Date();
			let at = now.getFullYear()
				+ '-' + (now.getMonth() + 1).toString().padStart(2, '0')
				+ '-' + now.getDate().toString().padStart(2, '0')
				+ ' ' + now.getHours().toString().padStart(2, '0')
				+ ':' + (1 + now.getMinutes()).toString().padStart(2, '0')
				+ ':' + now.getSeconds().toString().padStart(2, '0')
			console.log(at)
			try {
				execSync(`git add . -A --`);
				execSync(`git commit -m "${at}"`)
			}catch(e){_watch();}
		}
	})
};

_watch();

setInterval(function() {
	_watch()
}, 8000)
