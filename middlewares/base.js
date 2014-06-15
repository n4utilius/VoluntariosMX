base = {}

base.isAuthenticated = function(req, res, next) {

  if ( req.isAuthenticated() ){  next() }
  else{ res.send({ 'success': false, 'msg': 'No Authenticated'}) }
}

module.exports = base