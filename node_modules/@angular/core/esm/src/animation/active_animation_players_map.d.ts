import { AnimationPlayer } from './animation_player';
export declare class ActiveAnimationPlayersMap {
    private _map;
    private _allPlayers;
    readonly length: number;
    find(element: any, animationName: string): AnimationPlayer;
    findAllPlayersByElement(element: any): AnimationPlayer[];
    set(element: any, animationName: string, player: AnimationPlayer): void;
    getAllPlayers(): AnimationPlayer[];
    remove(element: any, animationName: string): void;
}
