// import {
//   databaseErrorMessage,
//   forbiddenErrorMessage,
//   noIdProvidedErrorMessage,
//   userNotFoundErrorMessage,
// } from '../errorMessages'
// import {
//   deleteUser,
//   getUserRow,
// } from '../db/queries'

// import { sqlQuery } from '../db'


// const deleteUserController = async(req, res, next) => {
//   const doomedId = req.body.doomedId

//   if (doomedId === undefined) {
//     return noIdProvidedErrorMessage(res)
//   } else if (doomedId === 'superuser') {
//     return forbiddenErrorMessage(res)
//   }

//   const getUserResult = await sqlQuery(getUserRow(doomedId))

//   if (getUserResult.error) {
//     return databaseErrorMessage(res)
//   }

//   if (getUserResult.rows.length === 0) {
//     return userNotFoundErrorMessage(res)
//   }

//   await sqlQuery(deleteUser(doomedId))

//   res.status(200).send('success')
//   next()
// }

// export default deleteUserController
