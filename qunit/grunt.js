/*global config:true, task:true*/
module.exports=function(a){a.loadNpmTasks("grunt-git-authors");a.initConfig({pkg:"<json:package.json>",qunit:{qunit:"test/index.html",addons:["addons/canvas/canvas.html","addons/close-enough/close-enough.html","addons/composite/composite-demo-test.html"]},lint:{qunit:"qunit/qunit.js",grunt:"grunt.js"},jshint:{qunit:{options:{onevar:!0,browser:!0,bitwise:!0,curly:!0,trailing:!0,immed:!0,latedef:!1,newcap:!0,noarg:!1,noempty:!0,nonew:!0,sub:!0,undef:!0,eqnull:!0,proto:!0,smarttabs:!0},globals:{jQuery:!0,exports:!0}},addons:{options:{browser:!0,curly:!0,eqnull:!0,eqeqeq:!0,expr:!0,evil:!0,jquery:!0,latedef:!0,noarg:!0,onevar:!0,smarttabs:!0,trailing:!0,undef:!0},globals:{module:!0,test:!0,asyncTest:!0,expect:!0,start:!0,stop:!0,QUnit:!0}},tests:{}}});a.registerTask("build-git",function(c){function b(b){return b.replace(" - A JavaScript Unit Testing Framework","-"+c+" "+a.template.today("isoDate")+" - A JavaScript Unit Testing Framework")}a.file.copy("qunit/qunit.css","dist/qunit-git.css",{process:b});a.file.copy("qunit/qunit.js","dist/qunit-git.js",{process:b})});a.registerTask("testswarm",function(c,b){var e=require("testswarm"),d=a.file.readJSON(b).qunit;e({url:d.swarmUrl,pollInterval:1E4,timeout:18E5,done:this.async()},{authUsername:"qunit",authToken:d.authToken,jobName:'QUnit commit #<a href="https://github.com/jquery/qunit/commit/'+c+'">'+c.substr(0,10)+"</a>",runMax:d.runMax,"runNames[]":"QUnit","runUrls[]":d.testUrl+c+"/test/index.html","browserSets[]":["popular"]})});a.registerTask("default","lint qunit")};