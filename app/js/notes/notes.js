module.exports = function(app) {
	require('./controllers/gym_controller')(app);
	require('./directives/member_form_directive')(app);
};