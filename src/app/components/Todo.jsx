"use client";
import { useState } from "react";
import { addTodo, deleteTodo, updateTodo } from "@/TodoReducer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const Todo = () => {
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const dispatch = useDispatch();
    const items = useSelector((state) => state.userTodo);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const addTodoItem = () => {
        if (title.trim()) {
            dispatch(addTodo(title));
            setTitle("");
        }
    };

    const handleEditChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleUpdate = (id) => {
        if (editTitle.trim()) {
            dispatch(updateTodo({ id, title: editTitle }));
            setEditId(null);
            setEditTitle("");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTodo(id));
                Swal.fire(
                    'Deleted!',
                    'Your todo has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-4">My Todo List</h3>
            <div className="flex justify-center mb-4">
                <input
                    className="border-2 border-gray-300 p-2 rounded-l-md w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter Task"
                />
                <button
                    className="border-2 bg-red-500 p-2 rounded-r-md text-white transition duration-300 hover:bg-red-600 flex items-center"
                    onClick={addTodoItem}
                >
                    Add
                </button>
            </div>
            <ul className="list-none">
                {items.map((element) => (
                    <li key={element.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105 max-w-full">
                        <div className="flex-1 max-w-[65%] overflow-hidden">
                            <span className="font-semibold">{element.title}</span>
                            <span className={`ml-2 text-sm ${element.completed ? 'text-green-500' : 'text-red-500'}`}>
                                {element.completed ? "Completed" : "Not Completed"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="border-2 p-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition duration-300 flex items-center mr-2"
                                onClick={() => handleDelete(element.id)}
                            >
                                <FaTrash className="mr-1" /> Delete
                            </button>
                            {editId === element.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={handleEditChange}
                                        placeholder="New Title"
                                        className="border-2 border-gray-300 p-2 rounded w-32"
                                    />
                                    <button
                                        className="border-2 p-2 bg-green-400 text-white rounded hover:bg-green-500 transition duration-300 flex items-center"
                                        onClick={() => handleUpdate(element.id)}
                                    >
                                        <FaCheck className="mr-1" /> Update
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="border-2 p-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition duration-300 flex items-center"
                                    onClick={() => {
                                        setEditId(element.id);
                                        setEditTitle(element.title);
                                    }}
                                >
                                    <FaEdit className="mr-1" /> Edit
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
