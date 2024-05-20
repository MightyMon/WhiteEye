
import { Terminal } from 'primereact/terminal';
import styles from "../../ui/dashboard/terminal.module.css"
const TerminalPage = () => {
    return(
        <div className={styles.container}>
			<div className={styles.terminal}>
			<Terminal welcomeMessage="Use your commands here" prompt="admin@whiteeye $" />
			</div>
        </div>
    )
}

export default TerminalPage





// 'use client'
// import React, { useState } from 'react';

// import { Xterm } from 'xterm-react';

// function App() {
// 	const [Terminal, setTerminal] = useState(null);
// 	const [input, setInput] = useState('');

// 	const onTermInit = (term) => {
// 		setTerminal(term);
// 		term.reset();
// 		term.write('Hello from \x1B[1;3;31mMighty\x1B[0m $');
// 		term.write('\r\nUse your commands here\r\n')
// 	};

// 	const onTermDispose = (term) => {
// 		console.log('Terminal disposed');
// 		setTerminal(null);
// 	};

// 	const handleData = (data) => {
// 		if (Terminal) {
// 			const code = data.charCodeAt(0);
// 			// If the user hits empty and there is something typed echo it.
// 			if (code === 13 && input.length > 0) {
// 				Terminal.write("\r\nYou typed: '" + input + "'\r\n");
// 				Terminal.write('echo> ');
// 				const nameOutput = exec(input)
// 				console.log(nameOutput)
// 				Terminal.write(nameOutput)
// 				setInput('');
// 			} else if (code < 32 || code === 127) {
// 				console.log('Control Key', code);
// 				// Disable control Keys such as arrow keys
// 				return;
// 			} else {
// 				// Add general key press characters to the terminal
// 				Terminal.write(data);
// 				setInput(input + data);
// 			}
// 		}
// 	};

// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<Xterm
// 					onInit={onTermInit}
// 					onDispose={onTermDispose}
// 					onData={handleData}
// 				/>
// 			</header>
// 		</div>
// 	);
// }

// export default App;