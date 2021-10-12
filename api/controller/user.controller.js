const {
  registerService,
  loginService,
} = require('../service/user.service');

exports.register = async (req, res) => {
  const {
    body,
  } = req;

  try {
    const response = await registerService(body);
    res.status(201).send(response);
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(status).send({
      message,
    });
  }
};

exports.login = async (req, res) => {
  const {
    body,
  } = req;

  try {
    const response = await loginService(body);
    res.status(200).send({
      message: 'Successfully authenticated user',
      token: response,
    });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(status).send({
      message,
    });
  }
};

// exports.findOne = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const response = await findByPkService(id);
//         res.send(response);
//     } catch (err) {
//         const status = err.status || 500
//         const message = err.message || "Internal Server Error!"
//         res.status(status).send({
//             message
//         });
//     }
// };

// exports.update = async (req, res) => {
//     const id = req.params.id;
//     const {
//         body
//     } = req;

//     try {
//         const response = await updateService(id, body);
//         res.send(response);
//     } catch (err) {
//         const status = err.status || 500
//         const message = err.message || "Internal Server Error!"
//         res.status(status).send({
//             message
//         });
//     }
// };

// exports.remove = async (req, res) => {
//     const id = req.params.id;

//     try {
//         await removeService(id);
//         res.status(200).send();
//     } catch (err) {
//         const status = err.status || 500
//         const message = err.message || "Internal Server Error!"
//         res.status(status).send({
//             message
//         });
//     }
// };
