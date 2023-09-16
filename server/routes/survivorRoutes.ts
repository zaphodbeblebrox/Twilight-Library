const PuzzleController = require('../controllers/puzzleController');

module.exports = (app) => {
    app.get('/api/puzzles', PuzzleController.findAllPuzzles);
    app.get('/api/puzzles/:id', PuzzleController.findOnePuzzle);
    app.post('/api/puzzles', PuzzleController.createPuzzle);
    app.put('/api/puzzles/:id', PuzzleController.updatePuzzle);
    app.delete('/api/puzzles/:id', PuzzleController.deletePuzzle);
};
