import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { VictoryModal } from './components/VictoryModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { DailyModal } from './components/DailyModal';
import { TwoPlayerModal } from './components/TwoPlayerModal';
import { SettingsModal } from './components/SettingsModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { CatBreed } from './engine/types';
import { RotateCcw, HeartOff, Users } from 'lucide-react';
import { CatIcon } from './components/CatIcon';
import { FreePlayModal } from './components/FreePlayModal';

export function App() {
  const {
    settings,
    stats,
    campaignProgress,
    dailyProgress,
    gameMode,
    currentLevel,
    currentPuzzle,
    cells,
    inputMode,
    setInputMode,
    hearts,
    maxHearts,
    timerSeconds,
    isWon,
    isGameOver,
    history,
    redoStack,
    activeHint,
    twoPlayerConfig,
    currentPlayer,
    satisfiedRows,
    satisfiedCols,
    satisfiedRegions,
    remainingCats,
    handleCellAction,
    handleUndo,
    handleRedo,
    handleHint,
    handleDismissHint,
    handleReset,
    handleSelectCampaignLevel,
    handleNextLevel,
    handleSelectDaily,
    handleStartFreePlay,
    handleStartTwoPlayer,
    handleUpdateSettings,
    handleResetProgress,
    hasNextLevel,
    isGenerating,
    generationError,
  } = useGameState();

  // Modals visibility state
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isTwoPlayerOpen, setIsTwoPlayerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isFreePlayOpen, setIsFreePlayOpen] = useState(false);

  // Determine current active cat breed (supports two-player custom breeds)
  const activeBreed: CatBreed =
    gameMode === 'twoplayer' && twoPlayerConfig
      ? ((currentPlayer === 1 ? twoPlayerConfig.player1Breed : twoPlayerConfig.player2Breed) as CatBreed)
      : settings.catBreed;

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col justify-start overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#fdf8f4] to-[#fbf1e8] dark:from-[#1a1926] dark:to-[#12111a] text-slate-800 dark:text-slate-100 font-bubble transition-colors duration-300 pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))]">
      {/* Header */}
      <Header
        gameMode={gameMode}
        playStyle={settings.playStyle}
        levelNumber={currentLevel?.levelNumber}
        levelName={currentLevel?.name}
        gridSize={currentPuzzle.size}
        hearts={hearts}
        maxHearts={maxHearts}
        timerSeconds={timerSeconds}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => handleUpdateSettings({ soundEnabled: !settings.soundEnabled })}
        onOpenLevels={() => setIsLevelsOpen(true)}
        onOpenDaily={() => setIsDailyOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenTwoPlayer={() => setIsTwoPlayerOpen(true)}
        onNewFreePlay={() => setIsFreePlayOpen(true)}
        catBreed={activeBreed}
        theme={settings.theme}
        activeHint={activeHint}
        onDismissHint={handleDismissHint}
      />

      {/* Main Game Area */}
      <main className="flex-1 w-full max-w-[min(94vw,500px)] mx-auto flex flex-col items-center justify-start px-2 pt-1 pb-1 gap-1.5 sm:gap-2">
        {isGenerating && <p role="status" className="text-sm font-bold text-amber-700">Creating your map…</p>}
        {generationError && <p role="alert" className="text-sm text-rose-700">{generationError} Choose a board size or daily date to retry.</p>}
        {/* Two Player Active Turn Banner */}
        {gameMode === 'twoplayer' && twoPlayerConfig && (
          <div className="w-full max-w-[min(92vw,480px)] p-2 rounded-2xl bg-amber-500/10 dark:bg-white/5 border border-amber-400/40 flex items-center justify-between animate-pop-in">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-white/10 p-1 shadow-sm">
                <CatIcon breed={activeBreed} expression="happy" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-950 dark:text-amber-100 block">
                  {currentPlayer === 1 ? twoPlayerConfig.player1Name : twoPlayerConfig.player2Name}'s Turn!
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-300">
                  Place a cat or eliminate spots together
                </span>
              </div>
            </div>
            <Users className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2" />
          </div>
        )}

        {/* Interactive Board */}
        <Board
          puzzle={currentPuzzle}
          cells={cells}
          inputMode={inputMode}
          catBreed={activeBreed}
          theme={settings.theme}
          dimCompleted={settings.dimCompleted}
          highlightConflicts={settings.highlightConflicts}
          satisfiedRows={satisfiedRows}
          satisfiedCols={satisfiedCols}
          satisfiedRegions={satisfiedRegions}
          onCellAction={handleCellAction}
          disabled={isGenerating || isWon || isGameOver}
          playerBreeds={twoPlayerConfig ? { 1: twoPlayerConfig.player1Breed, 2: twoPlayerConfig.player2Breed } : undefined}
          activeHint={activeHint}
        />

        {/* Player Controls */}
        <Controls
          inputMode={inputMode}
          onSetInputMode={setInputMode}
          canUndo={history.length > 0}
          canRedo={redoStack.length > 0}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onHint={handleHint}
          onReset={handleReset}
          catBreed={activeBreed}
          remainingCats={remainingCats}
        />
      </main>

      {/* Out of Hearts Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-rose-200 text-center flex flex-col items-center gap-3">
            <div className="w-20 h-20 -mt-10 bg-rose-100 dark:bg-rose-950/60 rounded-full p-2.5 shadow-lg border-4 border-white dark:border-cozy-darkCard">
              <CatIcon breed={settings.catBreed} expression="shocked" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              Out of Hearts! <HeartOff className="w-5 h-5 text-rose-500" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aloof cats need their space! Take a breath and try again.
            </p>

            <div className="w-full flex flex-col gap-2 mt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleUpdateSettings({ playStyle: 'zen' });
                  handleReset();
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold text-xs"
              >
                Switch to Zen Mode (No Lives)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isWon}
        timeSeconds={timerSeconds}
        bestTimeSeconds={
          gameMode === 'campaign' && currentLevel
            ? campaignProgress[currentLevel.id]?.bestTimeSeconds
            : undefined
        }
        heartsRemaining={hearts}
        maxHearts={maxHearts}
        levelNumber={gameMode === 'campaign' ? currentLevel?.levelNumber : undefined}
        hasNextLevel={Boolean(hasNextLevel)}
        onNextLevel={handleNextLevel}
        onReplay={handleReset}
        onClose={() => setIsLevelsOpen(true)}
        catBreed={activeBreed}
      />

      {/* Level Select Modal */}
      {isFreePlayOpen && <FreePlayModal initialSize={currentPuzzle.size} onClose={() => setIsFreePlayOpen(false)} onStart={handleStartFreePlay} />}
      <LevelSelectModal
        isOpen={isLevelsOpen}
        onClose={() => setIsLevelsOpen(false)}
        currentLevelId={currentLevel?.id || ''}
        progressMap={campaignProgress}
        onSelectLevel={handleSelectCampaignLevel}
      />

      {/* Daily Challenge Modal */}
      <DailyModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
        stats={stats}
        dailyProgressMap={dailyProgress}
        onSelectDate={handleSelectDaily}
      />

      {/* Two Player Co-Op Modal */}
      <TwoPlayerModal
        isOpen={isTwoPlayerOpen}
        onClose={() => setIsTwoPlayerOpen(false)}
        onStartTwoPlayer={handleStartTwoPlayer}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetProgress={handleResetProgress}
      />

      {/* Install on Device Guide Modal */}
      <InstallGuideModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />
    </div>
  );
}
export default App;
