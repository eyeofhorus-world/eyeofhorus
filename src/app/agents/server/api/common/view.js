
class CommonView {
  json(res, object) {
    res.status(200).send(object);
  }
  html(res, object, { noCache }) {
    if (noCache === true) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
    }
    res.status(200).send(object);
  }
  notFound(res, data) {
    res.status(404).send(data);
  }
  internalServerError(res, error) {
    res.status(500).send({ 
      message: 'Internal Server Error', 
      raw: { 
        message: error.message || '',
        stack: error.stack || '',
      },
    });
  }
  notAuthorized(res, error) {
    res.status(403).send({ 
      error: 'Not authorized', 
      status: 403, 
      raw: error,
    });
  }
  redirect(res, url) {
    res.redirect(url);
  }
}

export default CommonView;
