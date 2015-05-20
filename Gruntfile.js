/*jshint node: true */
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.initConfig({
        compress: {
            main: {
                options: {
                    archive: 'rozwiazanie.zip'
                },
                files: [{
                    src: ['package.json', 'bower.json', 'serwer.js', 'sort.js', 'public/css/styl.less', 'public/js/skrypt.js']
                }]
            }
        }
    });
};
