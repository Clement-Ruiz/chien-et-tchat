/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res){
		return res.view('restricted/chat', { title: "Général", userid: req.user.id, username: req.user.username });
	},
};
