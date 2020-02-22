import React, { useState, useEffect } from "react";

//create your first component
export function Card() {
	const [todo, setTodo] = useState();
	const [list, setList] = useState([]);

	function getToDo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/dlozano93")
			.then(resp => resp.json())
			.then(data => {
				setList(data);
				console.log("getToDo", data);
			});
	}

	useEffect(() => {
		getToDo();
	}, []);

	function saveToDo(listToSave) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/dlozano93", {
			method: "PUT",
			body: JSON.stringify(listToSave),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log("saveToDo", data);
				getToDo();
			});
	}

	return (
		<div className="card w-50 mx-auto">
			<div className="card-body text-center">
				<div className="input-group mb-3">
					<input
						value={todo}
						onChange={e => setTodo(e.target.value)}
						onKeyPress={e => {
							if (e.key === "Enter") {
								saveToDo(
									list.concat({
										label: todo,
										done: false
									})
								);
								setTodo("");
							}
						}}
						type="text"
						className="form-control"
						placeholder="New Todo"
					/>
				</div>
				{list.map((item, index) => {
					return (
						<div
							className={
								item.done
									? "alert alert-primary"
									: "alert alert-secondary"
							}
							key={index}>
							<div className="row">
								<div className="col-6">{item.label}</div>
								<div className="col text-center">
									<button
										type="button"
										className="btn btn-success"
										onClick={() =>
											saveToDo(
												list.map((e, i) => {
													if (index === i) {
														return {
															label: e.label,
															done: true
														};
													} else {
														return e;
													}
												})
											)
										}>
										Done
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
