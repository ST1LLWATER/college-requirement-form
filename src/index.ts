import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
const port = process.env.PORT || 8080;
const prisma = new PrismaClient();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello World" });
});

app.get('/user', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (e) {
        res.json({ success: false, message: e });
    }
})

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userid = parseInt(id);
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userid
            }
        });
        res.json(user);
    }
    catch (e) {
        res.json({ success: false, message: e });
    }
})

app.post('/user', async (req, res) => {
    const { roll_no, full_name, project_name, operating_system, code_editor, database, misc } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                roll_no,
                full_name,
                project_name,
                operating_system,
                code_editor,
                database,
                misc
            }
        });
        res.json(user);
    }
    catch (e) {
        res.json({ success: false, message: e });
    }
})

app.put('/user', async (req, res) => {
    const { id, roll_no, full_name, project_name, operating_system, code_editor, database, misc } = req.body;
    const userid = parseInt(id);
    try {
        const user = await prisma.user.update({
            where: {
                id: userid
            },
            data: {
                roll_no,
                full_name,
                project_name,
                operating_system,
                code_editor,
                database,
                misc
            }
        });
        res.json(user);
    }
    catch (e) {
        res.json({ success: false, message: e });
    }
})

app.delete('/user', async (req, res) => {
    const { id } = req.body;
    const userid = parseInt(id);
    try {
        const user = await prisma.user.delete({
            where: {
                id: userid
            }
        });
        res.json(user);
    }
    catch (e) {
        res.json({ success: false, message: e });
    }
})

app.listen(port, () =>
    console.log(`🚀 Server ready at: ${port}`)
);