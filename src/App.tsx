import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Edit from "./pages/Edit";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/create" element={<Create />} />
						<Route path="/edit/:shorturl" element={<Edit />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
