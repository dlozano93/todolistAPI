import React, { useState } from "react";

//create your first component
export function Card() {
	const [todo, setTodo] = useState();
	const [list, setList] = useState([]);
	return (
		<div className="card w-50 mx-auto">
			<div className="card-body text-center">
				<div className="input-group mb-3">
					<input
						value={todo}
						onChange={e => setTodo(e.target.value)}
						onKeyPress={e => {
							if (e.key === "Enter") {
								setList(list.concat(todo));
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
						<div className="alert alert-primary" key={index}>
							<div className="row">
								<div className="col-6">{item}</div>
								<div className="col text-center">
									<button
										type="button"
										className="btn btn-success"
										onClick={() =>
											setList(
												list.filter(e => e !== item)
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
