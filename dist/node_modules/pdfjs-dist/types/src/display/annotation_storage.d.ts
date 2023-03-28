/**
 * Key/value storage for annotation data in forms.
 */
export class AnnotationStorage {
    _storage: Map<any, any>;
    _modified: boolean;
    onSetModified: any;
    onResetModified: any;
    /**
     * Get the value for a given key if it exists, or return the default value.
     *
     * @public
     * @memberof AnnotationStorage
     * @param {string} key
     * @param {Object} defaultValue
     * @returns {Object}
     */
    public getValue(key: string, defaultValue: Object): Object;
    /**
     * Get the value for a given key.
     *
     * @public
     * @memberof AnnotationStorage
     * @param {string} key
     * @returns {Object}
     */
    public getRawValue(key: string): Object;
    /**
     * Set the value for a given key
     *
     * @public
     * @memberof AnnotationStorage
     * @param {string} key
     * @param {Object} value
     */
    public setValue(key: string, value: Object): void;
    getAll(): any;
    get size(): number;
    /**
     * @private
     */
    private _setModified;
    resetModified(): void;
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    get serializable(): Map<any, any> | null;
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    get hash(): string;
}
