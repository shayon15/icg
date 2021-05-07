function escapeInp(t) {
    t = t.replace(/&/g, '&amp;');
    t = t.replace(/</g, '&lt;');
    t = t.replace(/>/g, '&gt;');
    t = t.replace(/\n/g, '<br/>');
    return t;
}

var preRun = function() {
    FS.quit();
    FS.staticInit();
    FS.ignorePermissions = true;
    try
    {
	var inp = document.getElementById('inputTextarea').value;
	$('#inputModal').modal('hide');
	$('#inputPre').html(escapeInp(inp));
	FS.createDataFile('/', 'Net1_CMH.inp', inp, true, true);
    } catch (e) {
	console.log('/input.inp creation failed');
    }
},
	postRun = function() {
    var t = Module.intArrayToString(FS.findObject('/report.txt').contents),
	    s = $('#status'),
	    m = s.html(),
	    success = 0 > m.indexOf('error'), 
	    l = (success ? '<span class="label label-success">Success</span>'
	    : '<span class="label label-important">Error</span>');
    s.html(l + m.replace(/^[ \n]*\.\.\. */, ' '));    
    $('#output').html(escapeInp(t));
    epanetjs.setSuccess(success);
    $('#working').modal('hide');
    Module['calledRun'] = false;
},
	Module = {
    arguments: ['/Net1_CMH.inp', '/report.txt', '/report.bin'],
    preRun: preRun,
    postRun: postRun
};

runButton = function() {
    $('#working').modal('show');
    //Module.run();
}

saveButton = function() {
    var inp = $('#inputTextarea').val(),
	    blob = new Blob([inp], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'epanet.js.inp');
}
