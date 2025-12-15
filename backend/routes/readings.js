const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const readingsCtrl = require('../controllers/readingsController');


// Validation rules
const readingValidation = [
body('heartRate').isInt({ min: 20, max: 220 }).withMessage('heartRate must be an integer between 20 and 220'),
body('bloodPressure')
.matches(/^\d{2,3}\/\d{2,3}$/)
.withMessage('bloodPressure must be in format "120/80"'),
body('stressLevel').isIn(['Low', 'Moderate', 'High']).withMessage('stressLevel must be Low, Moderate, or High'),
body('sleepHours').isFloat({ min: 0, max: 24 }).withMessage('sleepHours must be between 0 and 24'),
body('exerciseMinutes').isInt({ min: 0, max: 1440 }).withMessage('exerciseMinutes must be between 0 and 1440'),
];


const idParam = [param('id').isMongoId().withMessage('Invalid id')];


router.post('/add', readingValidation, readingsCtrl.addReading);
router.get('/all', readingsCtrl.getAllReadings);
router.get('/:id', idParam, readingsCtrl.getReading);
router.put('/:id', idParam.concat(readingValidation), readingsCtrl.updateReading);
router.delete('/:id', idParam, readingsCtrl.deleteReading);


module.exports = router;