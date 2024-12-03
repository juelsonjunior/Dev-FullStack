import express from 'express';
import {
    formatDate,
    listAllDate,
    writeDataFile,
    verifyDuplicateDate,
} from '../../utils.js';

const router = express.Router();

router.post('/new-article', (req, res) => {
    try {
        const { titleArticle, contentArticle } = req.body;

        if (titleArticle == '' || contentArticle == '') {
            return res
                .status(400)
                .json({ message: 'Obrigatorio prencher todos campos' });
        }
        const articles = listAllDate('articles.json');
        const newArticle = {
            id: articles.length ? articles[articles.length - 1].id + 1 : 1,
            title: titleArticle,
            content: contentArticle,
            createAt: formatDate(),
            updateAt: formatDate(),
        };

        const verify = verifyDuplicateDate(
            articles,
            newArticle,
            'articles.json'
        );

        if (verify) {
            res.status(201).json({ message: 'Artigo adicionado com sucesso' });
        } else {
            res.status(409).json({ message: 'O Artigo já foi publicado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar artigo', error });
    }
});

router.put('/edit-article/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { titleArticle, contentArticle } = req.body;
        const articles = listAllDate('articles.json');

        if (titleArticle == '' || contentArticle == '') {
            return res
                .status(400)
                .json({ message: 'Obrigatorio prencher todos campos' }); 
        }

        const findIdArticle = articles.find(
            (article) => article.id == id.replace(":", "")
        );

        const findDuplicate = articles.find(
            (article) => article.title == titleArticle
        );

        if (!findIdArticle) {
            return res.status(404).json({ message: 'ID não encontrado' });
        }

        if (findDuplicate) {
            return res
                .status(409)
                .json({ message: 'O Artigo já foi publicado' });
        }

        findIdArticle.title = titleArticle;
        findIdArticle.content = contentArticle;
        findIdArticle.updateAt = formatDate();

        writeDataFile(articles, 'articles.json');
        res.status(201).json({ message: 'Artigo editado com sucesso' });
        res.status(200).json(findIdArticle);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao editar o artigo', error });
    }
});

router.delete('/del-article/:id', (req, res) => {
    try {
        const { id } = req.params;
        const articles = listAllDate('articles.json');
        const filterArticles = articles.filter(
            (article) => article.id != id.replace(':', '')
        );

        if (filterArticles.length == articles.length) {
            res.status(500).json({ message: 'O artigo não foi apagado' });
        }

        writeDataFile(filterArticles, 'articles.json');
        res.status(200).json({ message: 'O Artigo foi apagado' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar o artigo', error });
    }
});

export default router;
