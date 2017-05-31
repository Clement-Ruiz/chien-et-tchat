/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res){
		return res.view('restricted/chat', { title: "Général", userid: req.user.id, username: req.user.username });
	},
	getAll: function(req,res){
		if (!req.isSocket) {
			return res.badRequest();
		}
		Message.find().sort('createdAt DESC').limit(15).populate('author').exec(function(err, messages){
			if(err){
				sails.log.error(err);
				return res.negotiate(err);
			}
			if(messages){
				Message.watch(req);
				return res.ok(messages);
			}
		});
	},
	post: function(req, res){
		if (!req.isSocket) {
			return res.badRequest();
		}

		var author= req.user.id;
		var content= req.param("content");
		if (author === '' || content === ''){
			sails.log.error('MessageController.post : author or content empty.');
			return res.send(500, 'Content or username empty');
		}
		else{
			Message.create({author: author, content: content}).exec(function(err, message){
				if(err){
					sails.log.error(err);
					return res.negotiate(err);
				}
				if(!message){
					sails.log.error('Message creation OK but no message returned. something\'s weird');
					return res.send(500, 'Message creation OK but no message returned. something\'s weird');
				}
				else{
					//Populating the author
					Message.findOne({id: message.id}).populate('author').exec(function(er, msg){
						if(er){
							sails.log.error(er);
							return res.negotiate(er);
						}
						if(!msg){
							sails.log.error('Message creation OK populating the author failed');
							return res.send(500, 'Message creation OK populating the author failed');
						}
						else{
							Message.publishCreate(msg);
							return res.ok();
						}
					});
				}
			});
		}
	},

};
