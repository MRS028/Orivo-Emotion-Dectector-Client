import History from "./History";


const HistoryPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* <Navbar /> */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Your Emotion History</h2>
          <p className="text-muted-foreground mb-8">
            Review all your previously analyzed texts and their detected emotions
          </p>
          <History />
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;