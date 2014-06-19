index = {}

index.isAuthenticated = function(req, res, next) {
  if ( req.isAuthenticated() ){  next() }
  else{ res.send({ 'success': false, 'code': 401, 'msg': 'No Authenticated' }) }
}

index.isUnauthenticated = function(req, res, next) {
  if ( !req.isAuthenticated() ){  next() }
  else{ res.send({ 'success': false, 'code': 401, 'msg': 'Had already authenticated' }) }
}


module.exports = index