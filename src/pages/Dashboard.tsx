import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import URLList from "@/components/URLList";
import { Link } from "react-router";

const Dashboard = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex justify-between">
					<h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-balance">
						URLS
					</h1>
					<Link to="/create">
						<Button>Create</Button>
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<URLList />
			</CardContent>
		</Card>
	);
};

export default Dashboard;
